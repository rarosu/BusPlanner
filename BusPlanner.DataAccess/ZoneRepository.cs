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

        public ZoneRepository(IDbConnection connection)
        {
            this.connection = connection;
        }

        public void Add(Zone entity)
        {
            connection.Execute(@"insert Zones(UserFriendlyName) 
                                 values(@UserFriendlyName) 
                                 select cast(scope_identity() as int) as [Id]", entity);
        }

        public void Delete(Zone entity)
        {
            throw new NotImplementedException();
        }

        public Zone Get(int id)
        {
            return connection.Query<Zone>("select * from Zones where Id = @Id", new { Id = id }).SingleOrDefault();
        }
    }
}
