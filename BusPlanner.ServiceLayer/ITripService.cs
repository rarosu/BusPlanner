using BusPlanner.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPlanner.ServiceLayer
{
    public interface ITripService
    {
        List<Stop> GetStops();
    }
}
