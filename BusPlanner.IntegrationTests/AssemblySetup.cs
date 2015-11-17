using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Text.RegularExpressions;
using System.Reflection;
using FluentMigrator;
using FluentMigrator.Runner.Announcers;
using FluentMigrator.Runner.Initialization;
using FluentMigrator.Runner;
using BusPlanner.DataAccess.Migrations;
using System.Data;

namespace BusPlanner.IntegrationTests
{
    [TestClass]
    public class AssemblySetup
    {
        private static string DatabaseName = null;

        [AssemblyInitialize]
        public static void Initialize(TestContext testContext)
        {
            // Retrieve the name of the test database.
            var testConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["BusPlanner"];
            var regex = new Regex(@"Initial Catalog=(\w+);");
            DatabaseName = regex.Match(testConnectionString.ConnectionString).Groups[1].ToString();

            // Connect to the master database to be able to execute SQL commands.
            var masterConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["Master"];
            using (SqlConnection masterConnection = new SqlConnection(masterConnectionString.ConnectionString))
            {
                masterConnection.Open();

                // If a test database already exists, drop it.
                CloseConnectionsAndDropIfExists(masterConnection, DatabaseName);

                // Create a test database.
                var sqlCreate = "CREATE DATABASE [" + DatabaseName + "]";
                var commandCreate = new SqlCommand(sqlCreate, masterConnection);
                commandCreate.ExecuteNonQuery();

                masterConnection.Close();
            }

            // Connect to the test database.
            using (SqlConnection testConnection = new SqlConnection(testConnectionString.ConnectionString))
            {
                // Run migrations.
                MigrateToLatest(testConnectionString.ConnectionString);
            }
        }

        [AssemblyCleanup]
        public static void Cleanup()
        {
            // Connect to the master database.
            var masterConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["Master"];
            using (SqlConnection masterConnection = new SqlConnection(masterConnectionString.ConnectionString))
            {
                masterConnection.Open();

                // Drop the test database.
                CloseConnectionsAndDropIfExists(masterConnection, DatabaseName);

                masterConnection.Close();
            }
        }

        private static void CloseConnectionsAndDropIfExists(SqlConnection connection, string databaseName)
        {
            string sql = @"WHILE EXISTS(select NULL from sys.databases where name='" + databaseName + @"')
                           BEGIN
                               DECLARE @SQL varchar(max)
                               SELECT @SQL = COALESCE(@SQL,'') + 'Kill ' + Convert(varchar, SPId) + ';'
                               FROM MASTER..SysProcesses
                               WHERE DBId = DB_ID(N'" + databaseName + @"') AND SPId <> @@SPId
                               EXEC(@SQL)
                               DROP DATABASE [" + databaseName + @"]
                           END";
            var command = new SqlCommand(sql, connection);
            command.ExecuteNonQuery();
        }

        private class MigrationOptions : IMigrationProcessorOptions
        {
            public bool PreviewOnly { get; set; }
            public string ProviderSwitches { get; set; }
            public int Timeout { get; set; }
        }

        private static void MigrateToLatest(string connectionString)
        {
            var announcer = new TextWriterAnnouncer(s => System.Diagnostics.Debug.WriteLine(s));
            announcer.ShowSql = true;

            //var assembly = Assembly.GetExecutingAssembly();
            var assembly = Assembly.GetAssembly(typeof(CreateInitialSchema));

            var migrationContext = new RunnerContext(announcer)
            {
                Namespace = "BusPlanner.DataAccess.Migrations"
            };

            var options = new MigrationOptions { PreviewOnly = false, Timeout = 60 };
            var factory = new FluentMigrator.Runner.Processors.SqlServer.SqlServer2014ProcessorFactory();
            using (var processor = factory.Create(connectionString, announcer, options))
            {
                var runner = new MigrationRunner(assembly, migrationContext, processor);
                runner.MigrateUp(true);
            }
        }
    }
}
