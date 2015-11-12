using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPlanner.DomainModels
{
    /// <summary>
    /// A connection is a connection between two stops. It also lists the standard time it should take to travel between the stops.
    /// </summary>
    public class Connection
    {
        // Primary keys.
        public int Id { get; set; }

        // Entity data.
        public DateTime TravelTime { get; set; }

        // Foreign keys.
        public int FirstStopId { get; set; }
        public int SecondStopId { get; set; }
    }
}
