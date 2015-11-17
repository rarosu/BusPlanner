using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPlanner.DataAccess
{
    public interface IUnitOfWork : IDisposable
    {
        IStopRepository Stops { get; }
        IZoneRepository Zones { get; }

        void SaveChanges();
    }
}
