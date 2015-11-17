using BusPlanner.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPlanner.DataAccess
{
    public interface IZoneRepository
    {
        void Add(Zone entity);
        void Delete(Zone entity);
        Zone Get(int id);
    }
}
