exports.up = function(knex, Promise) {
  return knex.schema.createTable('entries', function(table) {
    table.increments();
    table.string('folder');
    table.text('entry_content');
    table.string('user_emotion');
    table.integer('anger_score');
    table.integer('disgust_score');
    table.integer('fear_score');
    table.integer('joy_score');
    table.integer('sadness_score');
    table.integer('analytical_score');
    table.integer('confident_score');
    table.integer('tentative_score');
    table.integer('openness_score');
    table.integer('conscientiousness_score');
    table.integer('extraversion_score');
    table.integer('agreeableness_score');
    table.integer('emotional_range_score');
    table.string('top_concept_title');
    table.string('top_concept_link');
    table.text('top_concept_description');
    table.string('first_video_link');
    table.string('first_video_title');
    table.text('first_video_description');
    table.string('second_video_link');
    table.string('second_video_title');
    table.text('second_video_description');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('entries');
};
