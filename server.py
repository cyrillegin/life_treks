import os
import cherrypy
import json

from tool import SQLAlchemyTool
from plugin import SQLAlchemyPlugin
from auth import AuthController, require, name_is

from sqlalchemy import Column
from sqlalchemy.types import String, Integer
from sqlalchemy.ext.declarative import declarative_base
from cherrypy.lib.static import serve_file

PATH = os.path.abspath(os.path.join(os.path.dirname(__file__)))
STATIC = os.path.join(PATH, 'static')
Base = declarative_base()


# create a models.py file
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


# class RestrictedArea:

#     _cp_config = {
#         'auth.require': [member_of('admin')]
#     }

#     @cherrypy.expose
#     def index(self):
#         return """This is the admin only area."""


class Root(object):

    @property
    def db(self):
        return cherrypy.request.db

    _cp_config = {
        'tools.sessions.on': True,
        'tools.auth.on': True
    }

    auth = AuthController()
    # restricted = RestrictedArea()

    @cherrypy.expose
    def index(self):
        url = "/".join([STATIC, 'index.html'])
        print "\n\n{}".format(url)
        return serve_file(url)

    # move all "required" things to its own file......
    @require(name_is("cyrille"))
    @cherrypy.expose
    def admin(self):
        url = "/".join([PATH, 'admin.html'])
        return serve_file(url)

    """
    consider making multiple databases,
    one for admin users, another that public
    queries for posts. All this should be moved
    to its own file as well.
    """
    @require(name_is("cyrille"))
    @cherrypy.expose
    def submitNewAdmin(self, **kwargs):
        # cherrypy.response.headers['Content-Type'] = 'application/json'
        adminObj = {
            'name': kwargs['name'],
            'password': kwargs['password']
        }
        self.db.add(User(name=adminObj['name'], password=adminObj['password']))
        self.db.commit()
        return json.dumps(adminObj, indent=4)

    @require(name_is("cyrille"))
    @cherrypy.expose
    def getAdminList(self):
        objs = self.db.query(User)
        obj = []
        for i in objs:
            newobj = {
                "name": i.name,
                "password": i.password
            }
            obj.append(newobj)
        return json.dumps(obj, indent=4)

    @require(name_is("cyrille"))
    @cherrypy.expose
    def deleteAdmin(self, **kwargs):
        newname = kwargs['name']
        curUsers = self.db.query(User)
        filteredUser = curUsers.filter_by(name=newname)
        if len(filteredUser.all()) > 0:
            self.db.delete(filteredUser.all()[0])
            myResponse = newname
        else:
            myResponse = "User not found!"
        return json.dumps(myResponse, indent=4)

    @require(name_is("cyrille"))
    @cherrypy.expose
    def SubmitPost(self, **kwargs):
        self.db.add(Blog(title=kwargs['title'], content=kwargs['content'], date="changeThis", tags=kwargs['tags']))
        self.db.commit()
        return json.dumps("success", indent=4)

    @cherrypy.expose
    def getBlogRoll(self, **kwargs):
        print "\nwe're here!\n"
        objs = self.db.query(Blog)
        print "did query! {}".format(objs)
        obj = []
        for i in objs:
            print "\ngot new obj: {}".format(i)
            newobj = {
                "title": i.title,
                "content": i.content,
                "date": i.date,
                "tags": i.tags
            }
            obj.append(newobj)
        return json.dumps(obj, indent=2)


def get_cp_config():
    return {
        '/': {
            'tools.db.on': True,
            'tools.staticdir.on': True,
            'tools.staticdir.dir': STATIC,
            'tools.staticdir.index': 'index.html',
        },
    }


def runserver(config):
    cherrypy.tools.db = SQLAlchemyTool()

    cherrypy.tree.mount(Root(), '/', config)

    dbfile = os.path.join(PATH, 'lifetreks.db')
    if not os.path.exists(dbfile):
        open(dbfile, 'w+').close()

    sqlalchemy_plugin = SQLAlchemyPlugin(
        cherrypy.engine, Base, 'sqlite:///%s' % (dbfile),
        echo=True
    )
    sqlalchemy_plugin.subscribe()
    sqlalchemy_plugin.create()

    cherrypy.server.socket_host = "0.0.0.0"
    cherrypy.engine.start()
    cherrypy.engine.block()


if __name__ == "__main__":
    runserver(get_cp_config())
else:
    cherrypy.config.update({'environment': 'embedded'})
    application = cherrypy.Application(
        Root(), script_name=None, config=get_cp_config())







