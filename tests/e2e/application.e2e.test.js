/**
 * End-to-End Tests for Movie Script Scraper Application
 * 
 * These tests verify the complete application workflow from command-line execution
 * to final output, including all modules working together.
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('Movie Script Scraper E2E Tests', () => {
    const testDir = path.join(__dirname, '../../test-output-e2e');
    const appPath = path.join(__dirname, '../../src/app.js');

    beforeEach(() => {
        // Clean up test directory
        if (fs.existsSync(testDir)) {
            fs.rmSync(testDir, { recursive: true, force: true });
        }
        fs.mkdirSync(testDir, { recursive: true });
    });

    afterEach(() => {
        // Clean up test directory
        if (fs.existsSync(testDir)) {
            fs.rmSync(testDir, { recursive: true, force: true });
        }
    });

    describe('Command Line Interface', () => {
        it('should execute successfully with genre argument', (done) => {
            const child = spawn('node', [appPath, '--genre', 'Action', '--total', '1', '--dest', testDir], {
                cwd: path.join(__dirname, '../..'),
                stdio: 'pipe'
            });

            let output = '';
            let errorOutput = '';

            child.stdout.on('data', (data) => {
                output += data.toString();
            });

            child.stderr.on('data', (data) => {
                errorOutput += data.toString();
            });

            child.on('close', (code) => {
                expect(code).toBe(0);
                expect(output).toContain('Script scrapping complete!');
                expect(errorOutput).toBe('');
                done();
            });
        });

        it('should execute successfully with title argument', (done) => {
            const child = spawn('node', [appPath, '--title', 'Test Movie', '--dest', testDir], {
                cwd: path.join(__dirname, '../..'),
                stdio: 'pipe'
            });

            let output = '';
            let errorOutput = '';

            child.stdout.on('data', (data) => {
                output += data.toString();
            });

            child.stderr.on('data', (data) => {
                errorOutput += data.toString();
            });

            child.on('close', (code) => {
                expect(code).toBe(0);
                expect(output).toContain('Script scrapping complete!');
                expect(errorOutput).toBe('');
                done();
            });
        });

        it('should execute with default settings when no arguments provided', (done) => {
            const child = spawn('node', [appPath], {
                cwd: path.join(__dirname, '../..'),
                stdio: 'pipe'
            });

            let output = '';
            let errorOutput = '';

            child.stdout.on('data', (data) => {
                output += data.toString();
            });

            child.stderr.on('data', (data) => {
                errorOutput += data.toString();
            });

            child.on('close', (code) => {
                expect(code).toBe(0);
                expect(output).toContain('Script scrapping complete!');
                expect(errorOutput).toBe('');
                done();
            });
        });

        it('should handle invalid genre gracefully', (done) => {
            const child = spawn('node', [appPath, '--genre', 'InvalidGenre', '--dest', testDir], {
                cwd: path.join(__dirname, '../..'),
                stdio: 'pipe'
            });

            let output = '';
            let errorOutput = '';

            child.stdout.on('data', (data) => {
                output += data.toString();
            });

            child.stderr.on('data', (data) => {
                errorOutput += data.toString();
            });

            child.on('close', (code) => {
                expect(code).toBe(0);
                expect(output).toContain('Sorry, invalid genre.');
                done();
            });
        });
    });

    describe('Output Validation', () => {
        it('should create proper file structure and content', (done) => {
            const child = spawn('node', [appPath, '--genre', 'Action', '--total', '1', '--dest', testDir], {
                cwd: path.join(__dirname, '../..'),
                stdio: 'pipe'
            });

            child.on('close', (code) => {
                expect(code).toBe(0);

                // Check if Action directory was created
                const actionDir = path.join(testDir, 'Action');
                expect(fs.existsSync(actionDir)).toBe(true);

                // Check if script files were created
                const files = fs.readdirSync(actionDir);
                expect(files.length).toBeGreaterThan(0);

                // Check file content
                const scriptFile = path.join(actionDir, files[0]);
                const content = fs.readFileSync(scriptFile, 'utf8');
                expect(content.length).toBeGreaterThan(0);

                done();
            });
        });
    });

    describe('Performance and Resource Usage', () => {
        it('should complete within reasonable time', (done) => {
            const startTime = Date.now();

            const child = spawn('node', [appPath, '--genre', 'Action', '--total', '1', '--dest', testDir], {
                cwd: path.join(__dirname, '../..'),
                stdio: 'pipe'
            });

            child.on('close', (code) => {
                const endTime = Date.now();
                const duration = endTime - startTime;

                expect(code).toBe(0);
                expect(duration).toBeLessThan(10000); // Should complete within 10 seconds
                done();
            });
        });

        it('should handle multiple concurrent requests', (done) => {
            const promises = [];

            // Start multiple concurrent scraping processes
            for (let i = 0; i < 3; i++) {
                const promise = new Promise((resolve) => {
                    const child = spawn('node', [appPath, '--genre', 'Action', '--total', '1', '--dest', `${testDir}-${i}`], {
                        cwd: path.join(__dirname, '../..'),
                        stdio: 'pipe'
                    });

                    child.on('close', (code) => {
                        resolve(code);
                    });
                });

                promises.push(promise);
            }

            Promise.all(promises).then((results) => {
                // All processes should complete successfully
                results.forEach(code => {
                    expect(code).toBe(0);
                });
                done();
            });
        });
    });

    describe('Error Scenarios', () => {
        it('should handle invalid destination directory', (done) => {
            const invalidDir = '/invalid/path/that/does/not/exist';

            const child = spawn('node', [appPath, '--genre', 'Action', '--dest', invalidDir], {
                cwd: path.join(__dirname, '../..'),
                stdio: 'pipe'
            });

            let output = '';
            let errorOutput = '';

            child.stdout.on('data', (data) => {
                output += data.toString();
            });

            child.stderr.on('data', (data) => {
                errorOutput += data.toString();
            });

            child.on('close', (code) => {
                // Should handle the error gracefully
                expect(code).toBe(0);
                done();
            });
        });

        it('should handle network timeouts gracefully', (done) => {
            // This test would require mocking network timeouts
            // For now, we'll just verify the application doesn't crash
            const child = spawn('node', [appPath, '--genre', 'Action', '--total', '1', '--dest', testDir], {
                cwd: path.join(__dirname, '../..'),
                stdio: 'pipe'
            });

            child.on('close', (code) => {
                expect(code).toBe(0);
                done();
            });
        });
    });
});
