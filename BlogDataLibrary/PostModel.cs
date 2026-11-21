using System;

namespace BlogDataLibrary
{
    public class PostModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
        public DateTime DateCreated { get; set; }
    }
}
