using BusPlanner.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPlanner.DataAccess
{
    public interface IScheduledRouteRepository
    {
        /// <summary>
        /// Get a specific scheduled route by id.
        /// </summary>
        ScheduledRoute GetScheduledRouteById(int id);
    }
}
