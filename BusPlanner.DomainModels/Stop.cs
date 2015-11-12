using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPlanner.DomainModels
{
    /// <summary>
    /// A stop specifies a specific place along a route that a bus will stop at.
    /// </summary>
    public class Stop
    {
        // Primary keys.
        public int Id { get; set; }

        // Entity data.
        public string UserFriendlyName { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }

        // Foreign keys.
        public int ZoneId { get; set; }
    }
}
