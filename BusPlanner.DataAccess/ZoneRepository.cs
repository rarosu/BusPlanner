﻿using System;
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

        public void Update(Zone entity)
        {
            var sql = @"UPDATE Zones SET UserFriendlyName = @UserFriendlyName WHERE Id = @Id";
            connection.Execute(sql, entity, transaction);
        }

        public void Delete(Zone entity)
        {
            var sql = @"DELETE FROM Zones WHERE Id = @Id";
            connection.Execute(sql, new { Id = entity.Id }, transaction);
        }

        public void Delete(int key)
        {
            var sql = @"DELETE FROM Zones Where Id = @Id";
            connection.Execute(sql, new { Id = key }, transaction);
        }

        public Zone Get(int id)
        {
            var sql = @"SELECT * FROM Zones WHERE Id = @Id";
            return connection.Query<Zone>(sql, new { Id = id }, transaction).SingleOrDefault();
        }

        public List<Zone> All()
        {
            var sql = @"SELECT * FROM Zones";
            return connection.Query<Zone>(sql, null, transaction).ToList();
        }
    }
}
