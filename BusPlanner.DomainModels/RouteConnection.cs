using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPlanner.DomainModels
{
    /// <summary>
    /// A route connection associates connections with routes and specifies in what order the connections are driven.
    /// </summary>
    public class RouteConnection
    {
        // Primary keys.
        public int RouteId { get; set; }
        public int ConnectionId { get; set; }

        // Entity data.
        public int DrivingOrder { get; set; }
    }
}
