exports.up = function(knex, Promise) {
    return knex.schema.createTable('entries', function(table) {
        table.increments();
        table.string('folder');
        table.text('title_entry');
        table.text('entry_content');
        table.string('user_emotion');
        table.string('highest_emotion');
        table.integer('anger_score');
        table.integer('disgust_score');
        table.integer('fear_score');
        table.integer('joy_score');
        table.integer('sadness_score');
        table.string('highest_language');
        table.integer('analytical_score');
        table.integer('confident_score');
        table.integer('tentative_score');
        table.string('highest_social');
        table.integer('openness_score');
        table.integer('conscientiousness_score');
        table.integer('extraversion_score');
        table.integer('agreeableness_score');
        table.integer('emotional_range_score');
        table.string('top_concept_title');
        table.text('top_concept_link');
        table.text('top_concept_description');
        table.text('first_video_link');
        table.string('first_video_title');
        table.text('first_video_description');
        table.text('second_video_link');
        table.string('second_video_title');
        table.text('second_video_description');
        table.text('explanation_entry');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('entries');
};
