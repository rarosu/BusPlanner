using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPlanner.DomainModels
{
    /// <summary>
    /// A zone specifies a region that encompasses a set of stops, for instance within a city. This data is used to calculate the ticket price.
    /// </summary>
    public class Zone
    {
        // Primary keys.
        public int Id { get; set; }

        // Entity data.
        public string UserFriendlyName { get; set; }
    }
}
