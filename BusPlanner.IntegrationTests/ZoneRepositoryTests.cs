using Autofac;
using BusPlanner.DataAccess;
using BusPlanner.DomainModels;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPlanner.IntegrationTests
{
    [TestClass]
    public class ZoneRepositoryTests : RollbackTestClass
    {
        [TestMethod]
        public void ZonesCanBeAddedAndRetrieved()
        {
            var id = 0;
            var container = AutofacBuilder.CreateContainer();
            using (var scope = container.BeginLifetimeScope())
            {
                var uow = scope.Resolve<IUnitOfWork>();
                var zone = new Zone { UserFriendlyName = "Borlänge" };
                uow.Zones.Add(zone);
                uow.SaveChanges();
                id = zone.Id;
            }

            using (var scope = container.BeginLifetimeScope())
            {
                var uow = scope.Resolve<IUnitOfWork>();
                var zone = uow.Zones.Get(id);
                zone.UserFriendlyName.Should().Be("Borlänge");
            }
        }

        [TestMethod]
        public void ZonesThatDoNotExistAndAreRetrievedShouldReturnNull()
        {
            var container = AutofacBuilder.CreateContainer();
            using (var scope = container.BeginLifetimeScope())
            {
                var uow = scope.Resolve<IUnitOfWork>();
                uow.Zones.Get(1).Should().BeNull();
            }
        }

        [TestMethod]
        public void ZonesCanBeRetrievedAsList()
        {
            var container = AutofacBuilder.CreateContainer();
            using (var scope = container.BeginLifetimeScope())
            {
                var uow = scope.Resolve<IUnitOfWork>();
                uow.Zones.Add(new Zone { UserFriendlyName = "Borlänge" });
                uow.Zones.Add(new Zone { UserFriendlyName = "Falun" });
                uow.SaveChanges();
            }

            using (var scope = container.BeginLifetimeScope())
            {
                var uow = scope.Resolve<IUnitOfWork>();
                var zones = uow.Zones.All();
                zones.Should().HaveCount(2);
            }
        }

        [TestMethod]
        public void ZonesCanBeDeleted()
        {
            var id = 0;
            var container = AutofacBuilder.CreateContainer();
            using (var scope = container.BeginLifetimeScope())
            {
                var uow = scope.Resolve<IUnitOfWork>();
                var zone = new Zone { UserFriendlyName = "Borlänge" };
                uow.Zones.Add(zone);
                uow.SaveChanges();
                id = zone.Id;
            }

            using (var scope = container.BeginLifetimeScope())
            {
                var uow = scope.Resolve<IUnitOfWork>();
                var zone = uow.Zones.Get(id);
                uow.Zones.Delete(zone);
            }

            using (var scope = container.BeginLifetimeScope())
            {
                var uow = scope.Resolve<IUnitOfWork>();
                var zone = uow.Zones.Get(id);
                zone.Should().BeNull();
            }
        }

        [TestMethod]
        public void ZonesCanBeDeletedBeforeSave()
        {
            var id = 0;
            var container = AutofacBuilder.CreateContainer();
            using (var scope = container.BeginLifetimeScope())
            {
                var uow = scope.Resolve<IUnitOfWork>();
                var zone = new Zone { UserFriendlyName = "Borlänge" };
                uow.Zones.Add(zone);
                uow.Zones.Delete(zone);
                uow.SaveChanges();
                id = zone.Id;
            }

            using (var scope = container.BeginLifetimeScope())
            {
                var uow = scope.Resolve<IUnitOfWork>();
                var zone = uow.Zones.Get(id);
                zone.Should().BeNull();
            }
        }
    }
}
