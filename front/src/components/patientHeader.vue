<template>
    <div>
        <h1>{{pid}} {{firstname}} {{lastname}}</h1>
        <h2>{{sex}} {{ud}} {{smoking}}</h2>

    </div>
</template>

<script>
import DatabaseService from "@/services/DatabaseService";
export default {
    name: 'patientHeader',
    props: [
        'pid'
    ],
    data() {
        return {
            firstname: null,
            lastname: null,
            sex: null,
            ud: null,
            smoking: null
        }
    },
    async mounted() {
        var that = this
        console.log(this.pid)
        await DatabaseService.getPatient({_id: this.pid}).then(function(data) {
            that.name = data[0].firstname + ' ' + data[0].lastname
            that.sex = data[0].sex
            that.ud = data[0].ud
            that.smoking = data[0].smoking
        })
    }

}
</script>