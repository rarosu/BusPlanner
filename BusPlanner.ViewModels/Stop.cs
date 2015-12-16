namespace BusPlanner.ViewModels
{
    /// <summary>
    /// Specifies a bus stop. Used for serialization by the API.
    /// </summary>
    public class Stop
    {
        public int id { get; set; }
        public string name { get; set; }
        public LatLng position { get; set; }
        public int zoneId { get; set; }
    }
}
