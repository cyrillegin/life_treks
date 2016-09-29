from sqlalchemy import Column, desc
from sqlalchemy.types import String, Integer


class Entry(Base):

    __tablename__ = 'name'

    id = Column(Integer, primary_key=True)
    firstName = Column(String())
    lastName = Column(String())
    age = Column(String())


class User(Base):

    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    name = Column(String())
    password = Column(String())
