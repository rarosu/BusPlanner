using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusPlanner.DomainModels;
using System.Data;
using Dapper;

namespace BusPlanner.DataAccess
{
    public class ZoneRepository : IZoneRepository
    {
        private readonly IDbConnection connection;
        private readonly IDbTransaction transaction;

        public ZoneRepository(IDbConnection connection, IDbTransaction transaction)
        {
            this.connection = connection;
            this.transaction = transaction;
        }

        public void Add(Zone entity)
        {
            var sql = @"INSERT Zones(UserFriendlyName)" +
                      @"VALUES (@UserFriendlyName); " +
                      @"SELECT CAST(scope_identity() AS INT)";
            entity.Id = connection.Query<int>(sql, entity, transaction).Single();
        }

        public void Delete(Zone entity)
        {
            throw new NotImplementedException();
        }

        public Zone Get(int id)
        {
            var sql = @"SELECT * FROM Zones WHERE Id = @Id";
            return connection.Query<Zone>(sql, new { Id = id }, transaction).SingleOrDefault();
        }
    }
}
