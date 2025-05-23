/**
 * @returns {Date}
 */
export const onlyDate = (date = null) => {
    const x = date ? new Date(date) : new Date()
    x.setHours(0)
    x.setMinutes(0)
    x.setSeconds(0)
    x.setMilliseconds(0)
    return x
}
export const APIURL = 'https://us-central1-alameen-mission.cloudfunctions.net/app'
export const pclasses = [
    'PP', 'I', 'II', 'III', 'IV',
    'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII',
    'NEET', 'JEE',
]
export const oneTimeFees = [
    { head: 'Registration fee', amount: 2000 },
    { head: 'Admission fee', amount: 1000 },
    { head: 'Beding charge', amount: 5000 },
]
export const yearlyFees = [
    { head: 'Development fee', amount: 14000 },
    { head: 'Electricity & generator charge', amount: 2190 },
    { head: 'M.I.S charge', amount: 1500 },
    { head: 'Assessment fee', amount: 2990 },
    { head: 'Maintanance fee', amount: 2790 },
    { head: 'Computer lab fee', amount: 1140 },
    { head: 'Laboratory fee', amount: 3490 },
    { head: 'Library fee', amount: 3390 },
    { head: 'Games & sports fee', amount: 490 },
    { head: 'Magazine', amount: 150 },
]
export const monthlyFees = [
    { head: 'Monthly fee', amount: 8090 },
]
export const streams = ['ARTS', 'SCIENCE', 'COMMERCE', 'OTHER']
export const mediums = ['BENGALI', 'ENGLISH', 'URDU', 'OTHER']
export const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
export const statuses = ['ACTIVE', 'DROPOUT']
export const genders = ['MALE', 'FEMALE', 'OTHER']
export const castes = ['GENERAL', 'OBC-A', 'OBC-B', 'SC', 'ST']
export const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'UK']//UK-UnKnown
export const orphanRemarksList = ['Father died', 'Mother died', 'Father & Mother both died']
export const nonParentRelationships = [
    'AUNT (MATERNAL)', 'AUNT (PATERNAL)', 'UNCLE (MATERNAL)', 'UNCLE (PATERNAL)', 'GRANDFATHER', 'GRANDMOTHER',
    'BROTHER', 'SISTER', 'HUSBAND', 'WIFE', 'FATHER IN LAW', 'MOTHER IN LAW', 'BROTHER IN LAW', 'SISTER IN LAW'
]
export const alameenLogo = require('../../../assets/logo.png').default
export const images = [
    { title: 'Student PHOTO', name: 'studentphoto' }, //name contain photo should have size > 100KB
    { title: 'Father PHOTO', name: 'fatherphoto' },
    { title: 'Mother PHOTO', name: 'motherphoto' },
    { title: 'Visitor1 PHOTO', name: 'visitor1photo' },
    { title: 'Visitor2 PHOTO', name: 'visitor2photo' },
    { title: 'AADHAR Card', name: 'aadharcard' },
    { title: 'EPIC Card', name: 'epiccard' },
    { title: 'PAN Card', name: 'pancard' },
    { title: 'Bank passbook', name: 'bankpassbook' },
    { title: 'Birth certificate', name: 'birthcertificate' },
    { title: 'Caste certificate', name: 'castecertificate' },
    { title: 'Disability certificate', name: 'disabilitycertificate' },
    { title: 'M.P marksheet', name: 'mpmarksheet' },
    { title: 'M.P admit card', name: 'mpadmitcard' },
    { title: 'M.P registration card', name: 'mpregistrationcard' },
    { title: 'H.S marksheet', name: 'hsmarksheet' },
    { title: 'H.S admit card', name: 'hsadmitcard' },
    { title: 'H.S registration card', name: 'hsregistrationcard' },
    { title: 'Admission slip', name: 'admissionslip' },
]
export const subjectCodes = [
    'ACCT',
    'ACCV',
    'AGHP',
    'AGNM',
    'AGPC',
    'AGPD',
    'ALTE',
    'ANTH',
    'ARBC',
    'ASMS',
    'BEBM',
    'BEMV',
    'BIOS',
    'BIOV',
    'BNGA',
    'BNGB',
    'BNGP',
    'BNGV',
    'BORG',
    'BORV',
    'BOTN',
    'BSTD',
    'CHEM',
    'CHEV',
    'CHNS',
    'CLPA',
    'COMA',
    'COMS',
    'CSTX',
    'ECGV',
    'ECOG',
    'ECON',
    'EDCN',
    'ENGA',
    'ENGB',
    'ENGV',
    'ENVS',
    'FACR',
    'FRNC',
    'GEGR',
    'GEOL',
    'GERG',
    'GJRT',
    'GRMN',
    'HINA',
    'HINB',
    'HINV',
    'HIST',
    'HMFR',
    'HOMN',
    'JMCN',
    'MATH',
    'MATV',
    'MLYM',
    'MRTH',
    'MTBN',
    'MUSC',
    'NEPA',
    'NEPB',
    'NEPV',
    'NUTN',
    'ODIA',
    'ORYA',
    'PADM',
    'PALI',
    'PHED',
    'PHIL',
    'PHYS',
    'PHYV',
    'PNJB',
    'POLS',
    'PRSN',
    'PSYC',
    'RSSN',
    'SANT',
    'SNSK',
    'SOCG',
    'STAT',
    'TAML',
    'TASM',
    'TCAC',
    'TCBG',
    'TCCA',
    'TCCO',
    'TCEM',
    'TCIE',
    'TCIN',
    'TCOP',
    'TCSA',
    'TCST',
    'TCTL',
    'TELG',
    'TELS',
    'TFEQ',
    'TFPR',
    'TMSM',
    'TRES',
    'TWSS',
    'URDU',
    'URDV',
    'VISA',
    'ZLGY',
]