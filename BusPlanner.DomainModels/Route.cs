using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPlanner.DomainModels
{
    /// <summary>
    /// A route is numbered path that a bus travels along. It consists of an ordered, circular list of connections that must start and end at the same stop.
    /// </summary>
    public class Route
    {
        // Primary keys.
        public int Id { get; set; }
    }
}
