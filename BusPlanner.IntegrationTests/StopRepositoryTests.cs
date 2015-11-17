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
        public void StopsCanBeAddedAndRetrieved()
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
        public void StopsThatDoNotExistAndAreRetrievedShouldReturnNull()
        {
            var container = AutofacBuilder.CreateContainer();
            using (var scope = container.BeginLifetimeScope())
            {
                var uow = scope.Resolve<IUnitOfWork>();
                uow.Stops.Get(1).Should().BeNull();
            }
        }

        [TestMethod]
        public void StopsCanBeRetrievedAsList()
        {
            var container = AutofacBuilder.CreateContainer();
            using (var scope = container.BeginLifetimeScope())
            {
                var uow = scope.Resolve<IUnitOfWork>();
                var zone = new Zone { UserFriendlyName = "Borlänge" };
                uow.Zones.Add(zone);
                uow.Stops.Add(new Stop { UserFriendlyName = "Uppfartsvägen", Latitude = 60.0f, Longitude = 50.0f, ZoneId = zone.Id });
                uow.Stops.Add(new Stop { UserFriendlyName = "Medvägen", Latitude = 60.0f, Longitude = 50.0f, ZoneId = zone.Id });
                uow.SaveChanges();
            }

            using (var scope = container.BeginLifetimeScope())
            {
                var uow = scope.Resolve<IUnitOfWork>();
                var stops = uow.Stops.All();
                stops.Should().HaveCount(2);
            }
        }

        [TestMethod]
        public void StopsCanBeDeleted()
        {
            var id = 0;
            var container = AutofacBuilder.CreateContainer();
            using (var scope = container.BeginLifetimeScope())
            {
                var uow = scope.Resolve<IUnitOfWork>();
                var zone = new Zone { UserFriendlyName = "Borlänge" };
                uow.Zones.Add(zone);
                var stop = new Stop { UserFriendlyName = "Uppfartsvägen", Latitude = 60.0f, Longitude = 50.0f, ZoneId = zone.Id };
                uow.Stops.Add(stop);
                uow.SaveChanges();
                id = stop.Id;
            }

            using (var scope = container.BeginLifetimeScope())
            {
                var uow = scope.Resolve<IUnitOfWork>();
                var stop = uow.Stops.Get(id);
                uow.Stops.Delete(stop);
            }

            using (var scope = container.BeginLifetimeScope())
            {
                var uow = scope.Resolve<IUnitOfWork>();
                var stop = uow.Stops.Get(id);
                stop.Should().BeNull();
            }
        }
    }
}
