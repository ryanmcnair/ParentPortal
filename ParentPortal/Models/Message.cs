using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParentPortal.Models
{
    public class Message
    {
        public int id { get; set; }
        public int user_id { get; set; }
        public string title { get; set; }
        public string text { get; set; }
    }
}
