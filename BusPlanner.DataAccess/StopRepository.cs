using BusPlanner.DomainModels;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPlanner.DataAccess
{
    public class StopRepository : IStopRepository
    {
        private readonly IDbConnection connection;
        private readonly IDbTransaction transaction;

        public StopRepository(IDbConnection connection, IDbTransaction transaction)
        {
            this.connection = connection;
            this.transaction = transaction;
        }

        public void Add(Stop entity)
        {
            var sql = @"INSERT Stops(UserFriendlyName, Latitude, Longitude, ZoneId) " +
                      @"VALUES (@UserFriendlyName, @Latitude, @Longitude, @ZoneId); " +
                      @"SELECT CAST(scope_identity() AS INT)";
            entity.Id = connection.Query<int>(sql, entity, transaction).Single();
        }

        public void Delete(Stop entity)
        {
            
        }

        public Stop Get(int id)
        {
            var sql = @"SELECT * FROM Stops WHERE Id = @Id";
            return connection.Query<Stop>(sql, new { Id = id }, transaction).SingleOrDefault();
        }
    }
}
