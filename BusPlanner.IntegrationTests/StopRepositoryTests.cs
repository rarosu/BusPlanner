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
    public class StopRepositoryTests : RollbackTestClass
    {
        

        [TestMethod]
        public void GetReturnsExistingStops()
        {
            var id = 0;
            var container = AutofacBuilder.CreateContainer();
            using (var scope = container.BeginLifetimeScope())
            {
                var uow = scope.Resolve<IUnitOfWork>();
                var zone = new Zone { UserFriendlyName = "Borlänge" };
                var stop = new Stop { UserFriendlyName = "Uppfartsvägen", Latitude = 60.0f, Longitude = 50.0f, ZoneId = 1 };
                uow.Zones.Add(zone);
                uow.Stops.Add(stop);
                uow.SaveChanges();
                id = stop.Id;
            }

            using (var scope = container.BeginLifetimeScope())
            {
                var uow = scope.Resolve<IUnitOfWork>();
                var stop = uow.Stops.Get(id);
                stop.UserFriendlyName.Should().Be("Uppfartsvägen");
            }
        }

        [TestMethod]
        public void GetReturnsNullForNonExistingStops()
        {
            var container = AutofacBuilder.CreateContainer();
            using (var scope = container.BeginLifetimeScope())
            {
                var uow = scope.Resolve<IUnitOfWork>();
                uow.Zones.Add(new Zone { UserFriendlyName = "Falun" });
                uow.SaveChanges();
                uow.Stops.Get(15).Should().BeNull();
            }
        }
    }
}
