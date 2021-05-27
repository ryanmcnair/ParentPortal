using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParentPortal.Models
{
    public class Message
    {
        public int id { get; set; }
        public int sender_id { get; set; }
        public int recipient_id { get; set; }
        public string message { get; set; }
    }
}
