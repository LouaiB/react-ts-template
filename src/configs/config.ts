/**
 * @description general web app configurations (Frontend)
 */

const Config = {
    apiUrl: `${process.env.NODE_ENV == 'production' ? 'https://live-web.com/api' : (process.env.REACT_APP_TEST_API || 'http://localhost:3333/api')}`,
    apiPublicFolderUrl: `${process.env.NODE_ENV == 'production' ? 'https://live-web.com/files' : (process.env.REACT_APP_TEST_API_PUBLIC_FOLDER || 'http://localhost:3333')}`,
    formats: {
        date: 'MM/DD/YYYY',
        time: 'hh:mm a',
        dateTime: 'MM/DD/YYYY hh:mm a',
        dateInputDate: 'YYYY-MM-DD',
        dateInputDateTime: 'YYYY-MM-DD[T]HH:mm',
        apiDateTime: 'YYYY-MM-DD HH:mm:ss',
        friendlyDate: 'dddd, MMMM Do, YYYY',
        isoDate: 'YYYY-MM-DD',
        headerDateTime: 'dddd, MMMM Do, YYYY hh:mm:ss a [GMT]ZZ',
        dateTimeZ: 'MM/DD/YYYY hh:mm a z'
    },
    userRoles: {
        ADMIN: 'admin'
    },
    misc: {
        searchDelay: 300
    },
    autoLoginExemptUrls: ['/forgot-password']
}

export default Config;