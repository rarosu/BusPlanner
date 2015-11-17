using BusPlanner.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPlanner.DataAccess
{
    public interface IStopRepository
    {
        void Add(Stop entity);
        void Delete(Stop entity);
        Stop Get(int id);
    }
}
