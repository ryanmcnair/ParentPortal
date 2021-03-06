USE [master]
GO
/****** Object:  Database [ParentPortal]    Script Date: 5/25/2021 10:59:00 AM ******/
CREATE DATABASE [ParentPortal]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ParentPortal', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\ParentPortal.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ParentPortal_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\ParentPortal_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [ParentPortal] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ParentPortal].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ParentPortal] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ParentPortal] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ParentPortal] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ParentPortal] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ParentPortal] SET ARITHABORT OFF 
GO
ALTER DATABASE [ParentPortal] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ParentPortal] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ParentPortal] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ParentPortal] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ParentPortal] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ParentPortal] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ParentPortal] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ParentPortal] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ParentPortal] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ParentPortal] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ParentPortal] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ParentPortal] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ParentPortal] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ParentPortal] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ParentPortal] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ParentPortal] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ParentPortal] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ParentPortal] SET RECOVERY FULL 
GO
ALTER DATABASE [ParentPortal] SET  MULTI_USER 
GO
ALTER DATABASE [ParentPortal] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ParentPortal] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ParentPortal] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ParentPortal] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ParentPortal] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'ParentPortal', N'ON'
GO
ALTER DATABASE [ParentPortal] SET QUERY_STORE = OFF
GO
USE [ParentPortal]
GO
/****** Object:  Table [dbo].[announcement]    Script Date: 5/25/2021 10:59:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[announcement](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[school_id] [int] NOT NULL,
	[publisher_id] [int] NOT NULL,
	[pdf_url] [varchar](max) NULL,
	[date_added] [datetime] NULL,
	[text] [varchar](max) NULL,
	[staff_only] [bit] NOT NULL,
 CONSTRAINT [PK_announcement] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[assignment]    Script Date: 5/25/2021 10:59:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[assignment](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[classroom_id] [int] NOT NULL,
	[teacher_id] [int] NOT NULL,
	[pdf_url] [varchar](max) NULL,
	[date_added] [datetime] NULL,
	[date_due] [datetime] NULL,
	[text] [varchar](max) NULL,
 CONSTRAINT [PK_assignment] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[classroom]    Script Date: 5/25/2021 10:59:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[classroom](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[school_id] [int] NOT NULL,
	[class_name] [varchar](100) NULL,
 CONSTRAINT [PK_classroom] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[comment]    Script Date: 5/25/2021 10:59:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[comment](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[assignment_id] [int] NOT NULL,
	[user_id] [int] NOT NULL,
	[comment] [varchar](max) NULL,
 CONSTRAINT [PK_comment] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[like]    Script Date: 5/25/2021 10:59:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[like](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[assignment_id] [int] NOT NULL,
	[user_id] [int] NOT NULL,
 CONSTRAINT [PK_like] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[message]    Script Date: 5/25/2021 10:59:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[message](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[sender_id] [int] NOT NULL,
	[recipient_id] [int] NOT NULL,
	[message] [varchar](max) NULL,
 CONSTRAINT [PK_message] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[school]    Script Date: 5/25/2021 10:59:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[school](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[school_name] [varchar](75) NOT NULL,
 CONSTRAINT [PK_school] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[student]    Script Date: 5/25/2021 10:59:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[student](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[classroom_id] [int] NOT NULL,
	[student_name] [varchar](100) NULL,
 CONSTRAINT [PK_student] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user]    Script Date: 5/25/2021 10:59:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[classroom_id] [int] NULL,
	[name] [varchar](100) NULL,
	[is_teacher] [bit] NOT NULL,
	[is_parent] [bit] NOT NULL,
	[is_admin] [bit] NOT NULL,
	[student_id] [int] NULL,
	[fb_uid] [varchar](100) NULL,
 CONSTRAINT [PK_user] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[announcement] ON 

INSERT [dbo].[announcement] ([id], [school_id], [publisher_id], [pdf_url], [date_added], [text], [staff_only]) VALUES (1, 1, 7, N'https://dummyimage.com/300x200/d49774/ff003c.jpg', CAST(N'1905-06-15T00:00:00.000' AS DateTime), N'New Announcement', 0)
INSERT [dbo].[announcement] ([id], [school_id], [publisher_id], [pdf_url], [date_added], [text], [staff_only]) VALUES (2, 1, 7, N'https://dummyimage.com/300x200/d49774/ff003c.jpg', CAST(N'1905-06-15T00:00:00.000' AS DateTime), N'Staff Only Announcement', 1)
INSERT [dbo].[announcement] ([id], [school_id], [publisher_id], [pdf_url], [date_added], [text], [staff_only]) VALUES (3, 1, 7, N'https://dummyimage.com/300x200/d49774/ff003c.jpg', CAST(N'2021-05-24T10:34:09.000' AS DateTime), N'Staff Only Announcement', 1)
SET IDENTITY_INSERT [dbo].[announcement] OFF
SET IDENTITY_INSERT [dbo].[assignment] ON 

INSERT [dbo].[assignment] ([id], [classroom_id], [teacher_id], [pdf_url], [date_added], [date_due], [text]) VALUES (1, 1, 8, N'https://dummyimage.com/300x200/d49774/ff003c.jpg', CAST(N'2021-05-18T00:30:10.000' AS DateTime), CAST(N'2021-05-23T10:30:00.000' AS DateTime), N'This is an assignment from Nathan')
INSERT [dbo].[assignment] ([id], [classroom_id], [teacher_id], [pdf_url], [date_added], [date_due], [text]) VALUES (2, 2, 9, N'https://dummyimage.com/300x200/d49774/ff003c.jpg', CAST(N'2021-05-18T00:30:10.000' AS DateTime), CAST(N'2021-05-23T10:30:00.000' AS DateTime), N'This is an assignment from Dr T')
SET IDENTITY_INSERT [dbo].[assignment] OFF
SET IDENTITY_INSERT [dbo].[classroom] ON 

INSERT [dbo].[classroom] ([id], [school_id], [class_name]) VALUES (1, 1, N'Nathans Class')
INSERT [dbo].[classroom] ([id], [school_id], [class_name]) VALUES (2, 1, N'Dr Ts class')
SET IDENTITY_INSERT [dbo].[classroom] OFF
SET IDENTITY_INSERT [dbo].[comment] ON 

INSERT [dbo].[comment] ([id], [assignment_id], [user_id], [comment]) VALUES (1, 1, 1, N'Cool assignment')
INSERT [dbo].[comment] ([id], [assignment_id], [user_id], [comment]) VALUES (2, 1, 2, N'This assignment sucks!')
INSERT [dbo].[comment] ([id], [assignment_id], [user_id], [comment]) VALUES (3, 2, 5, N'This assignment sucks!')
SET IDENTITY_INSERT [dbo].[comment] OFF
SET IDENTITY_INSERT [dbo].[like] ON 

INSERT [dbo].[like] ([id], [assignment_id], [user_id]) VALUES (1, 1, 1)
INSERT [dbo].[like] ([id], [assignment_id], [user_id]) VALUES (2, 1, 2)
INSERT [dbo].[like] ([id], [assignment_id], [user_id]) VALUES (3, 2, 5)
SET IDENTITY_INSERT [dbo].[like] OFF
SET IDENTITY_INSERT [dbo].[message] ON 

INSERT [dbo].[message] ([id], [sender_id], [recipient_id], [message]) VALUES (1, 8, 9, N'Hi - this is Nathan sending Dr T a message')
INSERT [dbo].[message] ([id], [sender_id], [recipient_id], [message]) VALUES (2, 9, 8, N'Hi - this is Dr T sending Nathan a message')
SET IDENTITY_INSERT [dbo].[message] OFF
SET IDENTITY_INSERT [dbo].[school] ON 

INSERT [dbo].[school] ([id], [school_name]) VALUES (1, N'Nashville Software School')
SET IDENTITY_INSERT [dbo].[school] OFF
SET IDENTITY_INSERT [dbo].[student] ON 

INSERT [dbo].[student] ([id], [classroom_id], [student_name]) VALUES (1, 1, N'Billy Johnson')
INSERT [dbo].[student] ([id], [classroom_id], [student_name]) VALUES (2, 1, N'Mary Thompson')
INSERT [dbo].[student] ([id], [classroom_id], [student_name]) VALUES (3, 1, N'Michael J Fox')
INSERT [dbo].[student] ([id], [classroom_id], [student_name]) VALUES (4, 1, N'Robert Duval')
INSERT [dbo].[student] ([id], [classroom_id], [student_name]) VALUES (5, 2, N'Wayne Gretsky')
INSERT [dbo].[student] ([id], [classroom_id], [student_name]) VALUES (6, 2, N'Paul Paul Paul')
INSERT [dbo].[student] ([id], [classroom_id], [student_name]) VALUES (7, 2, N'Doofus McDoofusface')
INSERT [dbo].[student] ([id], [classroom_id], [student_name]) VALUES (8, 2, N'The Ultimate Warrior')
SET IDENTITY_INSERT [dbo].[student] OFF
SET IDENTITY_INSERT [dbo].[user] ON 

INSERT [dbo].[user] ([id], [classroom_id], [name], [is_teacher], [is_parent], [is_admin], [student_id], [fb_uid]) VALUES (1, 1, N'Ryan McNair', 0, 1, 0, 1, N'123456987')
INSERT [dbo].[user] ([id], [classroom_id], [name], [is_teacher], [is_parent], [is_admin], [student_id], [fb_uid]) VALUES (2, 1, N'Peter Parker', 0, 1, 0, 2, N'abC54324')
INSERT [dbo].[user] ([id], [classroom_id], [name], [is_teacher], [is_parent], [is_admin], [student_id], [fb_uid]) VALUES (3, 1, N'Tom Johnson', 0, 1, 0, 3, N'2122335sdf')
INSERT [dbo].[user] ([id], [classroom_id], [name], [is_teacher], [is_parent], [is_admin], [student_id], [fb_uid]) VALUES (4, 1, N'Hulk Hogan', 0, 1, 0, 4, N'2122335sdf')
INSERT [dbo].[user] ([id], [classroom_id], [name], [is_teacher], [is_parent], [is_admin], [student_id], [fb_uid]) VALUES (5, 2, N'Michael Knight', 0, 1, 0, 5, N'2122335sdf')
INSERT [dbo].[user] ([id], [classroom_id], [name], [is_teacher], [is_parent], [is_admin], [student_id], [fb_uid]) VALUES (6, 2, N'A Real Squirrel', 0, 1, 0, 6, N'2122335sdf')
INSERT [dbo].[user] ([id], [classroom_id], [name], [is_teacher], [is_parent], [is_admin], [student_id], [fb_uid]) VALUES (7, NULL, N'The Administrator', 0, 0, 1, NULL, N'2122335sdf')
INSERT [dbo].[user] ([id], [classroom_id], [name], [is_teacher], [is_parent], [is_admin], [student_id], [fb_uid]) VALUES (8, 1, N'Nathan Gonzalez', 1, 0, 0, NULL, N'tteukj88643Z')
INSERT [dbo].[user] ([id], [classroom_id], [name], [is_teacher], [is_parent], [is_admin], [student_id], [fb_uid]) VALUES (9, 2, N'Dr T', 1, 0, 0, NULL, N'fkja885')
SET IDENTITY_INSERT [dbo].[user] OFF
ALTER TABLE [dbo].[announcement]  WITH CHECK ADD  CONSTRAINT [FK_announcement_school] FOREIGN KEY([school_id])
REFERENCES [dbo].[school] ([id])
GO
ALTER TABLE [dbo].[announcement] CHECK CONSTRAINT [FK_announcement_school]
GO
ALTER TABLE [dbo].[announcement]  WITH CHECK ADD  CONSTRAINT [FK_announcement_user] FOREIGN KEY([publisher_id])
REFERENCES [dbo].[user] ([id])
GO
ALTER TABLE [dbo].[announcement] CHECK CONSTRAINT [FK_announcement_user]
GO
ALTER TABLE [dbo].[classroom]  WITH CHECK ADD  CONSTRAINT [FK_classroom_school] FOREIGN KEY([school_id])
REFERENCES [dbo].[school] ([id])
GO
ALTER TABLE [dbo].[classroom] CHECK CONSTRAINT [FK_classroom_school]
GO
ALTER TABLE [dbo].[comment]  WITH CHECK ADD  CONSTRAINT [FK_comment_assignment] FOREIGN KEY([assignment_id])
REFERENCES [dbo].[assignment] ([id])
GO
ALTER TABLE [dbo].[comment] CHECK CONSTRAINT [FK_comment_assignment]
GO
ALTER TABLE [dbo].[comment]  WITH CHECK ADD  CONSTRAINT [FK_comment_user] FOREIGN KEY([user_id])
REFERENCES [dbo].[user] ([id])
GO
ALTER TABLE [dbo].[comment] CHECK CONSTRAINT [FK_comment_user]
GO
ALTER TABLE [dbo].[like]  WITH CHECK ADD  CONSTRAINT [FK_like_assignment] FOREIGN KEY([assignment_id])
REFERENCES [dbo].[assignment] ([id])
GO
ALTER TABLE [dbo].[like] CHECK CONSTRAINT [FK_like_assignment]
GO
ALTER TABLE [dbo].[like]  WITH CHECK ADD  CONSTRAINT [FK_like_user] FOREIGN KEY([user_id])
REFERENCES [dbo].[user] ([id])
GO
ALTER TABLE [dbo].[like] CHECK CONSTRAINT [FK_like_user]
GO
ALTER TABLE [dbo].[message]  WITH CHECK ADD  CONSTRAINT [FK_message_user] FOREIGN KEY([sender_id])
REFERENCES [dbo].[user] ([id])
GO
ALTER TABLE [dbo].[message] CHECK CONSTRAINT [FK_message_user]
GO
ALTER TABLE [dbo].[message]  WITH CHECK ADD  CONSTRAINT [FK_message_user1] FOREIGN KEY([recipient_id])
REFERENCES [dbo].[user] ([id])
GO
ALTER TABLE [dbo].[message] CHECK CONSTRAINT [FK_message_user1]
GO
ALTER TABLE [dbo].[student]  WITH CHECK ADD  CONSTRAINT [FK_student_classroom] FOREIGN KEY([classroom_id])
REFERENCES [dbo].[classroom] ([id])
GO
ALTER TABLE [dbo].[student] CHECK CONSTRAINT [FK_student_classroom]
GO
ALTER TABLE [dbo].[user]  WITH CHECK ADD  CONSTRAINT [FK_user_classroom] FOREIGN KEY([classroom_id])
REFERENCES [dbo].[classroom] ([id])
GO
ALTER TABLE [dbo].[user] CHECK CONSTRAINT [FK_user_classroom]
GO
ALTER TABLE [dbo].[user]  WITH CHECK ADD  CONSTRAINT [FK_user_student] FOREIGN KEY([student_id])
REFERENCES [dbo].[student] ([id])
GO
ALTER TABLE [dbo].[user] CHECK CONSTRAINT [FK_user_student]
GO
USE [master]
GO
ALTER DATABASE [ParentPortal] SET  READ_WRITE 
GO
