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
    date = Column(String())

    blogTag = relationship("BlogTag", back_populates="blog")


class BlogTag(Base):

    __tablename__ = 'blogTag'

    id = Column(Integer, primary_key=True)
    tagname = Column(String())

    blog_id = Column(Integer, ForeignKey('blog.id'))
    blog = relationship("Blog", back_populates="blogTag")
# something