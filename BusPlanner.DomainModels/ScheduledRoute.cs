using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPlanner.DomainModels
{
    /// <summary>
    /// A scheduled route specifies a route and when the bus leaves the first stop. It also specifies periodicity: whether the bus runs once, every day or with any other supported periodicity.
    /// </summary>
    public class ScheduledRoute
    {
        // Primary keys.
        public int Id { get; set; }

        // Entity data.
        public DateTime DepartureTimeFromFirstStop { get; set; }
        public Periodicity Periodicity { get; set; }

        // Foreign keys.
        public int RouteId { get; set; }
    }
}
