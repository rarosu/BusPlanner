using Autofac;
using BusPlanner.DataAccess;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPlanner.IntegrationTests
{
    public static class AutofacBuilder
    {
        public static IContainer CreateContainer()
        {
            var builder = new ContainerBuilder();
            builder.Register(t => new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["BusPlanner"].ConnectionString)).As<IDbConnection>();
            //builder.RegisterType<StopRepository>().As<IStopRepository>();
            //builder.RegisterType<ZoneRepository>().As<IZoneRepository>();
            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>();
            return builder.Build();
        }
    }
}
