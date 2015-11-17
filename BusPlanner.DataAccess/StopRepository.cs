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

        public StopRepository(IDbConnection connection)
        {
            this.connection = connection;
        }

        public void Add(Stop entity)
        {
            connection.Execute(@"insert Stops(UserFriendlyName,Latitude,Longitude,ZoneId) 
                                 values(@UserFriendlyName,@Latitude,@Longitude,@ZoneId) 
                                 select cast(scope_identity() as int) as [Id]", entity);
        }

        public void Delete(Stop entity)
        {
            
        }

        public Stop Get(int id)
        {
            return connection.Query<Stop>("select * from Stops where Id = @Id", new { Id = id }).SingleOrDefault();
        }
    }
}
