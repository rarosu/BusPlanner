/*
(function () {
    "use strict";

    angular.module('busplanner')
    .service('editStopsUnitOfWorkService', ['stopRepositoryService', function (stopRepository) {
        this.create = function () {
            return new UnitOfWork();
        };

        var UNMODIFIED = 0;
        var ADDED = 1;
        var MODIFIED = 2;
        var DELETED = 3;

        function UnitOfWork() {
            this._stops = [];
            this._changeTracker = {};
        }

        UnitOfWork.prototype._updateCurrentState = function (serverState) {

        };

        UnitOfWork.prototype.getAll = function () {
            return $q(function (resolve, reject) {
                stopRepository.getAll().then(function (stops) {
                    for (var i = 0; i < stops.length; i++) {
                        for (var k = 0; k < this._stops.length; k++) {
                            if (this.stops[i].id === this._stops[k].id) {

                            }
                        }
                    }
                }, function (error) {

                });
            });
        };

        UnitOfWork.prototype.getById = function (id) {

        };

        UnitOfWork.prototype.add = function () {
            var stop = new models.Stop();
            this._changeTracker[stop] = ADDED;
        };

        UnitOfWork.prototype.remove = function (stop) {
            if (stop in this._changeTracker && this._changeTracker[stop] == ADDED) {
                var index = this._stops.indexOf(stop);
                this._stops.splice(index, 1);
                delete this._changeTracker[stop];
            }


        };
        */
        /*
        this.create = function () {
            return new UnitOfWork();
        };

        function UnitOfWork() {
            this._originalState = stopRepository.getStops();
            this._stops = angular.copy(this._originalState);
        }

        UnitOfWork.prototype.addStop = function (position, name) {
            var stop = new models.Stop();

            this._stops.push(stop);

            return stop;
        };

        UnitOfWork.prototype.removeStop = function (stop) {
            var index = this._stops.indexOf(stop);
            if (index != -1) {
                this._stops.splice(index, 1);
            }
        };

        UnitOfWork.prototype.isDirty = function () {

        };

        UnitOfWork.prototype._getAdded = function () {
            var added = [];
            for (var i = 0; i < this._stops.length; i++) {
                if (stop.id === -1) {
                    added.push(stop);
                }
            }

            return added;
        };

        UnitOfWork.prototype._getModified = function () {

        };

        UnitOfWork.prototype._getDeleted = function () {

        };

        UnitOfWork.prototype.save = function () {
            for (var i = 0; i < this._stops.length; i++) {
                var stop = this._stops[i];

                if (stop.id === -1) {
                    // A freshly created stop. Should be added.
                    stopRepository.addStop(stop).then(function (updatedStop) {
                        console.log('Stop successfully added: ' + updatedStop.id);
                        console.log(updatedStop);
                        stop = updatedStop;
                    }, function (error) {
                        // TODO: Consider the implications of this exception.
                        throw new Error(error);
                    });
                } else {
                    // An already existing stop on the server-side, check if there is a difference and if so, update it.
                    var originalIndex = stop.indexInArrayById(this._originalState);
                    if (originalIndex !== -1) {
                        if (!stop.equals(this._originalState[originalIndex])) {
                            stopRepository.updateStop(stop).then(function () {
                                console.log('Stop successfully updated');
                            }, function(error) {
                                // TODO: Consider the implications of this exception.
                                throw new Error(error);
                            });
                        }
                    } else {
                        // There is an element with an ID that is not in the original state. This should not happen.
                        throw new Error("Stop with ID not found in the original state.");
                    }
                }
            }

            for (var i = 0; i < this._originalState.length; i++) {
                var originalStop = this._originalState[i];

                // Check whether there are stops in the original state that does not exist in the current state. If so, remove that stop.
                var index = originalStop.indexInArrayById(this._stops);
                if (index === -1) {
                    stopRepository.deleteStop(originalStop);
                }
            }

            // TODO: Should this be synchronized before we know whether the update to server succeeded? As it is, a save cannot be retried if something goes wrong.
            this._originalState = this._stops;
        };
        *//*
    }]);
})();
*/