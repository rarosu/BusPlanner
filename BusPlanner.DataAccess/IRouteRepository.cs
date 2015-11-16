using BusPlanner.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPlanner.DataAccess
{
    public interface IRouteRepository
    {
        /// <summary>
        /// Get a route entity associated with a route number.
        /// </summary>
        Route GetRouteByNumber(int routeNumber);
    }
}
