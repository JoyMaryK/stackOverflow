create table Questions(
    qid varchar(255),
	uid varchar(255),
	title varchar(255),
	body varchar(1024),
	date DATE,
	isPreffered Bit default 0,
	primary key (qid)
)

go

create table Users(
  uid varchar(255),
  username varchar(255),
  email varchar(25),
  password varchar(255),
  location varchar(255),
  about varchar(1024),
  emailSent int,
  role varchar(255) default 'user',
  primary key (uid)
 )

 go

 create table Answers(
  aid varchar(255),
  qid varchar(255)  FOREIGN KEY REFERENCES Questions(qid),
  uid varchar(255) FOREIGN KEY REFERENCES Users(uid),
  answer text,
  primary key (aid)
 )

 go

 create table Tags(
  tid varchar(255),
  tagname varchar(255),
  description varchar(255),
  isDeleted bit default 0,
   primary key (tid)
 )

 go 
 create table TagsJoinQuestion(
 tid varchar(255) FOREIGN KEY REFERENCES Tags(tid),
 qid varchar(255) FOREIGN KEY REFERENCES Questions(qid)
 )
 go
create table Comments(
  cid varchar(255),
  aid varchar(255)  FOREIGN KEY REFERENCES Answers(aid),
  uid varchar(255) FOREIGN KEY REFERENCES Users(uid),
  comment varchar(255),
  primary key (cid)
)
go
create table Votes(
  vid varchar(255),
  aid varchar(255)  FOREIGN KEY REFERENCES Answers(aid),
  uid varchar(255) FOREIGN KEY REFERENCES Users(uid),
  type bit,
  primary key (vid)
)