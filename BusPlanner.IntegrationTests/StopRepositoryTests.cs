using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using BusPlanner.DataAccess;
using System.Data.SqlClient;
using BusPlanner.DomainModels;
using FluentAssertions;
using Autofac;
using System.Data;

namespace BusPlanner.IntegrationTests
{
    [TestClass]
    public class StopRepositoryTests
    {
        private IContainer CreateAutofacContainer()
        {
            var builder = new ContainerBuilder();
            builder.Register(t => new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["BusPlanner"].ConnectionString)).As<IDbConnection>();
            builder.RegisterType<StopRepository>().As<IStopRepository>();
            builder.RegisterType<ZoneRepository>().As<IZoneRepository>();
            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>();
            return builder.Build();
        }

        [TestMethod]
        public void GetReturnsExistingStops()
        {
            var container = CreateAutofacContainer();
            using (var scope = container.BeginLifetimeScope())
            {
                using (var uow = scope.Resolve<IUnitOfWork>())
                {
                    var zone = new Zone { UserFriendlyName = "Borlänge" };
                    var stop = new Stop { UserFriendlyName = "Uppfartsvägen", Latitude = 60.0f, Longitude = 50.0f, ZoneId = 1 };
                    uow.Zones.Add(zone);
                    uow.Stops.Add(stop);
                }
            }

            using (var scope = container.BeginLifetimeScope())
            {
                using (var uow = scope.Resolve<IUnitOfWork>())
                {
                    uow.Zones.Get(1).UserFriendlyName.Should().Be("Borlänge");
                    uow.Stops.Get(1).UserFriendlyName.Should().Be("Uppfartsvägen");
                }
            }
        }

        [TestMethod]
        public void GetReturnsNullForNonExistingStops()
        {
            var container = CreateAutofacContainer();
            using (var scope = container.BeginLifetimeScope())
            {
                using (var uow = scope.Resolve<IUnitOfWork>())
                {
                    uow.Stops.Get(1).Should().BeNull();
                }
            }
        }
    }
}
