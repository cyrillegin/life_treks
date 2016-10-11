import os
import cherrypy
import json
import random
import string
# from Models import User


class dbmanager(object):

    @property
    def db(self):
        return cherrypy.request.db

    # @cherrypy.expose
    # def create_new_admin(self, newAdmin):
    #     self.db.add(User(firstName=newAdmin['name'], password=newAdmin['password']))
    #     self.db.commit()

    # @cherrypy.expose
    # def getUserName(self, username):
    #     print "\nwe're here!\n"
    #     results = self.db.query(User)
    #     print results
        # .filter(name=username)

    # @cherrypy.expose
    # def viewDatabase(self):
    #     print self.db
