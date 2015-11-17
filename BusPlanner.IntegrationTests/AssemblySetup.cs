using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace BusPlanner.IntegrationTests
{
    [TestClass]
    public class AssemblySetup
    {
        [AssemblyInitialize]
        public static void Initialize(TestContext testContext)
        {
            // TODO: If a test database already exists, drop it.
            // TODO: Create a test database.
        }

        [AssemblyCleanup]
        public static void Cleanup()
        {
            // TODO: Drop the test database.
        }
    }
}
