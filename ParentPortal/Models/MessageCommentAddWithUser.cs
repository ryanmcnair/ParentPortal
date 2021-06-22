using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParentPortal.Models
{
    public class MessageCommentAddWithUser
    {
        public int id { get; set; }
        public int message_id { get; set; }
        public string user_id { get; set; }
        public string comment { get; set; }
        public string First_name { get; set; }
        public string Last_name { get; set; }
    }
}
