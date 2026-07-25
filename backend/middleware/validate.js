// backend/middleware/validate.js
const { z } = require('zod');

const UUID = z.string().uuid();

const schemas = {
  'skills.extract': z.object({
    rawInput: z.string().min(1).max(10000),
    type: z.enum(['topic', 'job_role']),
  }),
  'questions.generate': z.object({
    topicOrRoleId: UUID,
    count: z.number().int().min(1).max(25).optional(),
    previousScore: z.number().min(0).max(1).optional(),
    previousQuestions: z.array(z.string()).optional(),
  }),
  'sessions.start': z.object({
    topicOrRoleId: UUID,
    questionCount: z.number().int().min(1).max(20).optional(),
    questionIds: z.array(UUID).optional(),
  }),
  'sessions.answer': z.object({
    questionId: UUID,
    answerText: z.string().min(1).max(15000),
  }),
  'reports.generate': z.object({
    sessionId: UUID,
  }),
};

function validate(schemaKey) {
  return (req, res, next) => {
    const schema = schemas[schemaKey];
    if (!schema) return next();
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: 'Invalid request body.',
        details: result.error.issues.map(i => ({
          path: i.path.join('.'),
          message: i.message,
        })),
      });
    }
    req.body = result.data;
    next();
  };
}

module.exports = { validate, schemas };
