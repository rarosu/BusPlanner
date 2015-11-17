using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using BusPlanner.DataAccess;
using System.Data.SqlClient;
using BusPlanner.DomainModels;
using FluentAssertions;

namespace BusPlanner.IntegrationTests
{
    [TestClass]
    public class StopRepositoryTests
    {
        [TestMethod]
        public void GetReturnsExistingStops()
        {
            using (var connection = new SqlConnection("Data Source=localhost;Initial Catalog=BusPlannerTest;Integrated Security=true"))
            {
                using (var uow = new UnitOfWork(new StopRepository(connection), new ZoneRepository(connection)))
                {
                    var zone = new Zone { UserFriendlyName = "Borlänge" };
                    var stop = new Stop { UserFriendlyName = "Uppfartsvägen", Latitude = 60.0f, Longitude = 50.0f, ZoneId = 1 };
                    uow.Zones.Add(zone);
                    uow.Stops.Add(stop);
                }
            }

            using (var connection = new SqlConnection("Data Source=localhost;Initial Catalog=BusPlannerTest;Integrated Security=true"))
            {
                using (var uow = new UnitOfWork(new StopRepository(connection), new ZoneRepository(connection)))
                {
                    uow.Zones.Get(1).UserFriendlyName.Should().Be("Borlänge");
                    uow.Stops.Get(1).UserFriendlyName.Should().Be("Uppfartsvägen");
                }
            }
        }

        [TestMethod]
        public void GetReturnsNullForNonExistingStops()
        {

        }
    }
}
