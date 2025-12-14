// Project Timeline and Milestones Configuration

/**
 * Default timeline for solar installation projects
 * Each step includes duration and description
 */
export const DEFAULT_TIMELINE = [
    {
        step: 1,
        name: 'Permitting',
        duration: '1 week',
        description: 'Permitting would be done within a week'
    },
    {
        step: 2,
        name: 'Procurement',
        duration: '2 weeks',
        description: 'It takes time from around 2 weeks'
    },
    {
        step: 3,
        name: 'Installation',
        duration: '2-4 weeks',
        description: 'Installation takes 2-4 weeks time'
    },
    {
        step: 4,
        name: 'Site Assessment',
        duration: '2-3 weeks',
        description: 'The Site Assessment takes 2-3 weeks'
    },
    {
        step: 5,
        name: 'Electrical',
        duration: '4th week',
        description: 'The electrical work is wrapped up to the 4th week'
    },
    {
        step: 6,
        name: 'Commissioning',
        duration: '6th week',
        description: 'The commissioning will be completed upto 6th week'
    }
];

/**
 * System specification components
 */
export const SYSTEM_SPECIFICATION = {
    components: [
        { name: 'CAPACITY', dynamic: true }, // Will be filled with actual capacity
        { name: 'HDGI STRUCTURE', dynamic: false },
        { name: 'GRID TIED INVERTER', dynamic: false },
        { name: 'ONGRID SYSTEM', dynamic: false }
    ]
};
