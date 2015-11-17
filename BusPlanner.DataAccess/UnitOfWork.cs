using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPlanner.DataAccess
{
    public class UnitOfWork : IUnitOfWork
    {
        private IDbTransaction transaction;
        public IDbConnection Connection { get; private set; }
        public IStopRepository Stops { get; private set; }
        public IZoneRepository Zones { get; private set; }

        public UnitOfWork(IDbConnection connection)
        {
            Connection = connection;
            Connection.Open();
            transaction = Connection.BeginTransaction();

            Stops = new StopRepository(connection, transaction);
            Zones = new ZoneRepository(connection, transaction);
        }

        public void Dispose()
        {
            if (transaction != null)
                transaction.Rollback();
            Connection.Close();
        }

        public void SaveChanges()
        {
            if (transaction == null)
                throw new InvalidOperationException("Unit of work has already been saved.");
            transaction.Commit();
            transaction = null;
        }
    }
}
