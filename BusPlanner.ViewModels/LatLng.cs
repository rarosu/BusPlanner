namespace BusPlanner.ViewModels
{
    /// <summary>
    /// Specifies latitude and longitude. Used for serialization by the API.
    /// </summary>
    public class LatLng
    {
        public float lat { get; set; }
        public float lng { get; set; }
    }
}
