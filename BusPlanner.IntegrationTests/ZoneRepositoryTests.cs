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
        public void GetReturnsExistingZones()
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
    }
}
