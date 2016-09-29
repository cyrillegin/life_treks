import os
import cherrypy

from tool import SQLAlchemyTool
from plugin import SQLAlchemyPlugin
from sqlalchemy.ext.declarative import declarative_base

from auth import AuthController, require, member_of, name_is

from cherrypy.lib.static import serve_file

PATH = os.path.abspath(os.path.join(os.path.dirname(__file__)))
STATIC = os.path.join(PATH, 'static')
Base = declarative_base()


class RestrictedArea:
    # all methods in this controller (and subcontrollers) is
    # open only to members of the admin group

    _cp_config = {
        'auth.require': [member_of('admin')]
    }

    @cherrypy.expose
    def index(self):
        return """This is the admin only area."""


class Root(object):

    _cp_config = {
        'tools.sessions.on': True,
        'tools.auth.on': True
    }

    auth = AuthController()
    restricted = RestrictedArea()

    @cherrypy.expose
    def index(self):
        url = "/".join([STATIC, 'index.html'])
        print "\n\n{}".format(url)
        return serve_file(url)

    # This is only available if the user name is joe _and_ he's in group admin
    
    @require(name_is("cyrille"))
    @cherrypy.expose
    def admin(self):
        # return "this is a page for Cyrille"
        url = "/".join([PATH, 'admin.html'])
        return serve_file(url)


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







