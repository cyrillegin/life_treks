from sqlalchemy import Column, ForeignKey
from sqlalchemy.types import String, Integer
from sqlalchemy.orm import relationship
from base import Base


class User(Base):

    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    name = Column(String())
    password = Column(String())


class Blog(Base):

    __tablename__ = 'blog'

    id = Column(Integer, primary_key=True)
    title = Column(String())
    content = Column(String())
    tags = relationship("BlogTags")
    date = Column(String())


class BlogTags(Base):

    __tablename__ = 'tags'

    id = Column(Integer, primary_key=True)
    parent_id = Column(Integer, ForeignKey('Blog.id'))
    tagname = Column(String())
