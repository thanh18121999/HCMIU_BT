namespace Project.Models
{
    public class Upload_Files_Warehouse
    {
        public int ID { get; set; }
        public string? REALNAME { get; set; }
        public string? FILENAME { get; set; }
        public int? FILESIZE { get; set; }
        public string? FILEEXTENSION { get; set; }
        public int IDUSER { get; set; }

    }
}