/* eslint unicorn/filename-case: "off", func-names: "off", camelcase: "off", no-unused-vars: "off" */

module.exports = function (iface) {
    const {mqttPub, mqttSub, mqttStatus, log, Service, Characteristic} = iface;

    return function createService_StatelessProgrammableSwitch(acc, settings, subtype) {
        acc.addService(Service.StatelessProgrammableSwitch, settings.name, subtype);

        mqttSub(settings.topic.statusEvent, val => {
            log.debug('> hap set', settings.name, 'ProgrammableSwitchEvent', val);
            acc.getService(subtype)
                .setCharacteristic(Characteristic.ProgrammableSwitchEvent, val); // TODO clarify if updateCharacteristic should be used here
        });
    };
};
