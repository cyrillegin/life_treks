from sqlalchemy import Column
from sqlalchemy.types import String, Integer
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
    tags = Column(String())
    date = Column(String())
