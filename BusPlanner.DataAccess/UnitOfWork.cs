using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPlanner.DataAccess
{
    public class UnitOfWork : IUnitOfWork
    {
        public IStopRepository Stops { get; private set; }
        public IZoneRepository Zones { get; private set; }

        public UnitOfWork(IStopRepository stops, IZoneRepository zones)
        {
            Stops = stops;
            Zones = zones;
        }

        public void Dispose()
        {
            
        }

        public void SaveChanges()
        {
            
        }
    }
}
