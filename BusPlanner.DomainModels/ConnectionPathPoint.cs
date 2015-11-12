using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPlanner.DomainModels
{
    /// <summary>
    /// A connection path point is used to interpolate the actual path along the road a bus takes when traveling along a connection.
    /// </summary>
    public class ConnectionPathPoint
    {
        // Primary keys.
        public int Id { get; set; }

        // Entity data.
        public float Latitude { get; set; }
        public float Longitude { get; set; }

        // Foreign keys.
        public int ConnectionId { get; set; }
    }
}
